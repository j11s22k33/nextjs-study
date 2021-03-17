import { useRouter, withRouter } from "next/router";
import React, { useEffect } from "react";
// import { withRouter } from "react-router-dom";

const Index = ({ updateUI, location, match, history }) => {
  const router = useRouter();

  console.log("process.env => ", process.env);
  console.log("process.env.EXP => ", process.env.EXP);
  console.log("process.env.NEXT_PUBLIC_EXP => ", process.env.NEXT_PUBLIC_EXP);

  // const history = useHistory();
  useEffect(() => {
    // console.log(history);
    // history.push("/test", {});
    // console.log(history);
    console.log(location, match, history);
  }, []);

  return (
    <div>
      <a
        onClick={() => {
          router.push("/test");
        }}
      >
        test
      </a>
      <br />
      <img src="/assets/images/aaa.jpg" alt="aaa.jpg" />
    </div>
  );
};

export default withRouter(Index);
