import React            from "react";
import Loader           from "react-loader-spinner";
import Section          from "./common/Section";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const spinner = () => {
  return (
    <Section>
      <div className="hero-body">
        <div className="container has-text-centered is-both-centered">
          <Loader type="Bars" color="#000" height={100} width={100} />
        </div>
      </div>
    </Section>
  );
};

export default spinner;
