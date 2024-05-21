import React from "react";

function PersonalData({
  name,
  surname,
  email,
  title,
  phone,
  adress,
  about,
  onSetValue,
}) {
  return (
    <div className="data-field">
      <div className="redactor-fields__item-title top">Personal data</div>
      <div className="data-field-top">
        <div className="data-field__photo">
          <img
            className="data-field__photo-img"
            src="./src-img/upload.jpg"
            alt="userphoto"
          />
        </div>
        <div className="data-field__inf">
          <div className="data-field__name">
            <div className="data-field__input-container">
              Name
              <input
                type="text"
                placeholder="Name"
                className="input-field"
                value={name}
                onChange={(e) =>
                  onSetValue({ type: "SET_NAME", payload: e.target.value })
                }
              />
            </div>
            <div className="data-field__input-container">
              Surname
              <input
                type="text"
                placeholder="Surame"
                className="input-field"
                value={surname}
                onChange={(e) =>
                  onSetValue({ type: "SET_SURNAME", payload: e.target.value })
                }
              ></input>
            </div>
          </div>
          <div className="data-field__input-container">
            Email
            <input
              type="text"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) =>
                onSetValue({ type: "SET_EMAIL", payload: e.target.value })
              }
            ></input>
          </div>
        </div>
      </div>
      <div className="data-field__input-container">
        Title
        <input
          type="text"
          placeholder="Title"
          className="input-field"
          value={title}
          onChange={(e) =>
            onSetValue({ type: "SET_TITLE", payload: e.target.value })
          }
        />
      </div>
      <div className="data-field__input-container">
        Phone number
        <input
          type="text"
          placeholder="Phone number"
          className="input-field"
          value={phone}
          onChange={(e) =>
            onSetValue({ type: "SET_PHONE", payload: e.target.value })
          }
        />
      </div>
      <div className="data-field__input-container">
        Adress
        <input
          type="text"
          placeholder="Adress"
          value={adress}
          className="input-field"
          onChange={(e) =>
            onSetValue({ type: "SET_ADRESS", payload: e.target.value })
          }
        />
      </div>
      <div className="data-field__input-container">
        About you
        <textarea
          type="text"
          placeholder="Write about yourself"
          rows="5"
          maxLength="500"
          value={about}
          className="text-area"
          onChange={(e) =>
            onSetValue({ type: "SET_ABOUT", payload: e.target.value })
          }
        />
      </div>
    </div>
  );
}

export default React.memo(PersonalData);
