import "./Templates.css";

function Template1({
  name,
  surname,
  email,
  title,
  phone,
  adress,
  about,
  educations,
  experiences,
  skills,
}) {
  return (
    <div className="template" id="download">
      <div className="template-fields">
        <div className="line line1"></div>
        <div className="row1">
          <div className="row1-elem1">
            <div className="row1-elem1-name">
              <h2>S M I T H{name.split("").join(" ").toUpperCase()}</h2>
              <h1>
                W I L L I A M S {surname.split("").join(" ").toUpperCase()}
              </h1>
            </div>
            <div className="row1-elem1-title">ux-designer{title}</div>
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
              <p className="elem-item">scejeijj{adress}</p>
            </div>
            <div className="skill-elem">
              <div className="circle-item"></div>
              <p className="elem-item">+134590496{phone}</p>
            </div>
            <div className="skill-elem">
              <div className="circle-item"></div>
              <p className="elem-item">scejeijj@gmail.com{email}</p>
            </div>
          </div>
          <div className="row2-elem2">
            <div className="title">P R O F I L E</div>
            <div className="elem-item">
              {about}
              saasadadwdw ceshfuhe shecsiuhvie jsiheushvhse joisoihcoes
              josicjojs scjoijjs scoijoijse isjcoijse nscjeijos vjseoijvjse
              isjocjso joijsjcoise ijsjciose jsjoicose jiojsojsec
            </div>
          </div>
        </div>
        <div className="row2">
          <div className="row2-elem1">
            <div className="row2-elem1-skills">
              <div className="title">S K I L L S</div>
              {skills.map((item) => (
                <div className="skill-elem">
                  <div className="circle-item"></div>
                  <p className="elem-item">{item.name}</p>
                </div>
              ))}
              <div className="skill-elem">
                <div className="circle-item"></div>
                <p className="elem-item">scejeijj</p>
              </div>
              <div className="skill-elem">
                <div className="circle-item"></div>
                <p className="elem-item">scejeijj</p>
              </div>
              <div className="skill-elem">
                <div className="circle-item"></div>
                <p className="elem-item">scejeijj</p>
              </div>
            </div>

            <div className="row2-elem1-education">
              <div className="title">E D U C A T I O N</div>

              {educations.map((item) => (
                <div className="column-elem">
                  <div className="subtitle">
                    <div className="circle-item2">
                      <div className="inner-circle"></div>
                    </div>
                    {item.degree.split("").join(" ").toUpperCase()}
                  </div>
                  <div className="elem-item elem-item-line">
                    <p>{item.name.toUpperCase()}</p>
                    <p>{item.city}</p>
                    <p>
                      {item.startYear}-{item.endYear}
                    </p>
                  </div>
                </div>
              ))}

              <div className="column-elem">
                <div className="subtitle">
                  <div className="circle-item2">
                    <div className="inner-circle"></div>
                  </div>
                  jdajwjfoj
                </div>
                <div className="elem-item elem-item-line">
                  <p>name</p>
                  <p>city</p>
                  <p>2021-2022</p>
                </div>
              </div>
              <div className="column-elem">
                <div className="subtitle">
                  <div className="circle-item2">
                    <div className="inner-circle"></div>
                  </div>
                  jdajwjfoj
                </div>
                <div className="elem-item elem-item-line">
                  <p>name</p>
                  <p>city</p>
                  <p>2021-2022</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row2-elem2">
            <div className="row2-elem2-education">
              <div className="title">E X P E R I E N C E</div>
              {experiences.map((item) => (
                <div className="column-elem">
                  <div className="subtitle">
                    <div className="circle-item2">
                      <div className="inner-circle"></div>
                    </div>
                    {item.position.split("").join(" ").toUpperCase()}
                  </div>
                  <div className="elem-item elem-item-line">
                    <p>{item.company.toUpperCase()}</p>
                    <p>{item.city}</p>
                    <p>
                      {item.startDate}-{item.endDate}
                    </p>
                  </div>
                </div>
              ))}
              <div className="column-elem last">
                <div className="subtitle">
                  <div className="circle-item2">
                    <div className="inner-circle"></div>
                  </div>
                  jdajwjfoj
                </div>
                <div className="elem-item elem-item-line">
                  <p>name</p>
                  <p>city</p>
                  <p>2021-2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template1;
