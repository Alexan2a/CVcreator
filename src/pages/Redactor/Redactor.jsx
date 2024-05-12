import "./Redactor.css";

function Redactor() {
  return (
    <div className="redactor">
      <div className="header">
        <div className="overlay">
          <img className="logo-img" src="" alt="CVCreator" />
        </div>
      </div>
      <div className="redactor-fields">
        <div className="main-info">
          {/* <div className="main-info__item"> */}
          <div className="photo"></div>
          <div classname="info-container">
            <div classname="name-container">
              <div className="name__name">
                <input
                  type="text"
                  placeholder="Name"
                  className="input-field"
                  value={""}
                  // onChange={handleSetName}
                />
              </div>
              <div className="name__surname">
                {/* <input
                  type="text"
                  placeholder="Surname"
                  className="input-field"
                  value={""}
                  // onChange={handleSetName}
                /> */}
              </div>
            </div>
            <div className="Email">
              <input
                type="text"
                placeholder="Email"
                className="input-field"
                value={""}
                //  onChange={handleSetName}
              />
              {/* </div> */}
            </div>
          </div>
        </div>

        {/* <input
            type="text"
            placeholder="Phone number"
            className="input-field"
            value={""}
            // onChange={handleSetName}
          />
          <input
            type="text"
            placeholder="Email"
            className="input-field"
            value={""}
            //  onChange={handleSetName}
          />
          <input
            type="text"
            placeholder="Profession"
            className="input-field"
            value={""}
            //  onChange={handleSetName}
          />
        </div>
        <input
          type="text"
          placeholder="Experience"
          className="input-field"
          value={""}
          //  onChange={handleSetName}
        />
        <input
          type="text"
          placeholder="Skills"
          className="input-field"
          value={""}
          //  onChange={handleSetName}
        />
        <input
          type="text"
          placeholder="Education"
          className="input-field"
          value={""}
          //  onChange={handleSetName}
        />
        <input
          type="text"
          placeholder="About"
          className="input-field"
          value={""}
          //  onChange={handleSetName}
        /> */}
      </div>
    </div>
  );
}

export default Redactor;
