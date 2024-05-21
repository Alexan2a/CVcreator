import "./Templates.css";

function Template2({ resume, educations, experiences, skills }) {
  return (
    <div className="template" id="download">
      <div className="template-fields">
        <div className="line line1"></div>
        <div className="row1">
          <div className="row1-elem1">
            <div className="row1-elem1-name">
              <h2>{resume.name.split("").join(" ").toUpperCase()}</h2>
              <h1>{resume.surname.split("").join(" ").toUpperCase()}</h1>
            </div>
            <div className="row1-elem1-title">{resume.title}</div>
          </div>
          <div className="row1-elem2"></div>
        </div>
        <div className="line line2"></div>

        <div className="row2">
          <div className="row2-elem1">
            <div className="title title-padding">C O N T A C T</div>
            <div className="line line3"></div>
            <div className="skill-elem">
              <div className="circle-item"></div>
              <p className="elem-item">{resume.adress}</p>
            </div>
            <div className="skill-elem">
              <div className="circle-item"></div>
              <p className="elem-item">{resume.phone}</p>
            </div>
            <div className="skill-elem">
              <div className="circle-item"></div>
              <p className="elem-item">{resume.email}</p>
            </div>
            <div className="row2"></div>
            <div className="title">P R O F I L E</div>
            <div className="elem-item">{resume.about}</div>
            <div className="row2"></div>
            <div className="title">S K I L L S</div>
            {skills.map((item) => (
              <div className="skill-elem skill-elem-column">
                <p className="elem-item">{item.name}</p>
                <div className="skill-bar-container">
                  <div
                    className="skill-bar"
                    style={{ width: `${item.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="row2-elem2">
            <div className="row2-elem1-education">
              <div className="title">E D U C A T I O N</div>

              {educations.map((item) => (
                <div className="column-elem">
                  <div className="subtitle">
                    <div className="circle-item2">
                      <div className="inner-circle"></div>
                    </div>
                    {item.degree.toUpperCase()}
                  </div>
                  <div className="elem-item elem-item-line">
                    <p>{item.name.toUpperCase()}</p>
                    <p>{item.city}</p>
                    <p>
                      {item.startYear} - {item.endYear}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="row2"></div>

            <div className="row2-elem2-education">
              <div className="title">E X P E R I E N C E</div>
              {experiences.map((item) => (
                <div className="column-elem">
                  <div className="subtitle">
                    <div className="circle-item2">
                      <div className="inner-circle"></div>
                    </div>
                    {item.position.toUpperCase()}
                  </div>
                  <div className="elem-item elem-item-line">
                    <p>{item.company.toUpperCase()}</p>
                    <p>{item.city}</p>
                    <p>
                      {item.startDate} - {item.endDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template2;
