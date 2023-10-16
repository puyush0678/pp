import React from "react";
import "../Post.css";
const Post = React.forwardRef(({ post }, ref) => {
  const postbody = (
    <>
      <div className="card  ">
        <div className="row g-0">
          <div className="image col-sm-12  mb-3 col-md-4 mt-3 ">
            {/* <div className=" float-right d-flex justify-content-center align-items-center"> */}
            <img
              src="../img.jpg"
              className=" image1 img-fluid rounded "
              alt="..."
            />
            {/* </div> */}
          </div>
          <div className="col-sm-12 column  col-md-8   ">
            <div className="card-body   ">
              <h5 className="card-title  text ">
                <span className="span">Name : </span>
                <span className="content">{post.name}</span>
              </h5>
              <p className="card-text  text">
                <span className="span">Email : </span>
                {post.email}
              </p>
              <p className="card-text  text">
                <span className="span">Descrption : </span>
                {post.body}
              </p>
              <p className="card-text">
                <small className="text">
                  <span className="span">Post Id : </span>
                  {post.id}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  const content = ref ? <div ref={ref}>{postbody}</div> : <div>{postbody}</div>;
  return content;
});
export default Post;
