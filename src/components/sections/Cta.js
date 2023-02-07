import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import Button from "../elements/Button";
import ButtonGroup from "../elements/ButtonGroup";

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool,
};

const defaultProps = {
  ...SectionProps.defaults,
  split: false,
};

const Cta = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  ...props
}) => {
  const outerClasses = classNames(
    "cta section center-content-mobile reveal-from-bottom",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "cta-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider",
    split && "cta-split"
  );

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <div className="cta-slogan">
            <h3 className="m-0">Miễn phí 15 ngày dùng thử</h3>
          </div>
          <div className="cta-action">
            <ButtonGroup>
              <Button
                tag="a"
                color="dark"
                wideMobile
                href="https://apps.haravan.com/products/anhnoi-photo-review-danh-gia-bang-hinh-anh"
                target="_blank"
              >
                Cài đặt trên Haravan
              </Button>
              <Button
                tag="a"
                color="dark"
                wideMobile
                href="https://apps.sapo.vn/anhnoi-product-review-danh-gia-san-pham"
                target="_blank"
              >
                Cài đặt trên Sapo
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </section>
  );
};

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;
