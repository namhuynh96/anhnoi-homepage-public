import React, { useState, useEffect } from "react";
import classes from "./Partner.module.css";
import Button from "../../components/elements/Button";
import { useHttpClient } from "../../hooks/http-hook";

const Partner = () => {
  const [formValues, setFormValues] = useState({
    name: null,
    email: null,
    businessType: "youtuber",
    otherBusiness: null,
  });
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);
  const [urlRef, setUrlRef] = useState(null);
  const { isError, sendRequest } = useHttpClient();

  useEffect(() => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,20}$/;
    if (
      !!formValues.name &&
      emailRegex.test(formValues.email) &&
      ((formValues.businessType === "other" && !!formValues.otherBusiness) ||
        formValues.businessType !== "other")
    ) {
      setIsSendButtonDisabled(false);
    } else {
      setIsSendButtonDisabled(true);
    }
  }, [formValues]);

  const inputChangeHandler = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    setFormValues((prev) => ({ ...prev, [targetName]: targetValue }));
  };

  const sendHander = async () => {
    setIsSendButtonDisabled(true);
    const body = JSON.stringify({
      name: formValues.name,
      email: formValues.email,
      businessType:
        formValues.businessType !== "other"
          ? formValues.businessType
          : formValues.otherBusiness,
    });
    const resData = await sendRequest("/partner", "POST", body, {
      "Content-Type": "application/json",
    });
    setUrlRef(resData.refUrl);
  };

  return (
    <div className={classes.Form}>
      <div>Vui lòng điền các thông tin sau để trở thành đối tác:</div>
      <div className={classes.FormField}>
        <label>Tên bạn*:</label>
        <input
          className={classes.Input}
          name="name"
          placeholder="Tên bạn"
          onChange={inputChangeHandler}
        />
      </div>
      <div className={classes.FormField}>
        <label>Email*:</label>
        <input
          className={classes.Input}
          name="email"
          placeholder="Email"
          onChange={inputChangeHandler}
        />
      </div>
      <div className={classes.FormField}>
        <label>Hiện tại bạn là:</label>
        <select
          className={classes.Input}
          name="businessType"
          onChange={inputChangeHandler}
          value={formValues.businessType}
        >
          <option value="youtuber">Youtuber</option>
          <option value="blogger">Blogger</option>
          <option value="agency">Agency</option>
          <option value="developer">Developer</option>
          <option value="other">Khác</option>
        </select>
      </div>
      {formValues.businessType === "other" && (
        <div className={classes.FormField}>
          <label>Cụ thể*:</label>
          <input
            className={classes.Input}
            name="otherBusiness"
            placeholder="Cụ thể công việc"
            onChange={inputChangeHandler}
          />
        </div>
      )}
      <div className={classes.SendButton}>
        <Button
          color="primary"
          wideMobile
          disabled={isSendButtonDisabled}
          onClick={sendHander}
        >
          Gửi
        </Button>
      </div>
      {urlRef && (
        <div className={classes.Message}>
          <div>
            Đây là link giới thiệu app Ảnh Nổi của bạn. Hãy lưu nó lại để chia
            sẻ và nhận 20% doanh số từ mỗi lượt tải app:
          </div>
          <div className={classes.UrlRef}>{urlRef}</div>
        </div>
      )}
      {isError && (
        <div className={classes.Message}>
          Đã xảy ra lỗi, xin vui lòng thử lại sau!
        </div>
      )}
    </div>
  );
};

export default Partner;
