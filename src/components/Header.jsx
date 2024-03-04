import React from "react";
import "../styles/header.css";
import Bell from "../assets/Bell.svg";

function Header() {
  return (
    <div className="header-container">
      <div className="person-info">
        <div className="person-image">
          <img
            src="https://s3-alpha-sig.figma.com/img/45cc/bea6/a401fdb441ad75e9d10e08922059b436?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AuR8QkoVHWS85iUzgNm6rvIgxHNKM4H-LpIDjjbV6wWFWUEZ0i4~vH55paxmvpozXDRBrccp6wFjc3xAzvw5nffJa~eDsVPSC~zJUdFhAgQrjMbRz8CAYSkzGvA4LM10BqSaWqReRUXF7eFcPdDYfaNIAlG6aEYs0ArhDGcCqiqDF19he6pGE5TgssOBwFYnR8k~Keg0Mj10F-5gGLGp4mqmQdiQDosi-W6w9pD0lbipbV6csr8XnD48~Ln~sTiQufHMEUlrsdTtqkmXD5itI7~eoGILkKMdgxnh6RyyCfHiktD4gr3ZbVbhAET8KQ~2Y1LnR1pDdWq~h~UqA~M7rA__"
            alt="Imagen de la persona"
          />
        </div>
        <div>
          <div className="person-name">Kaiden Stormwood</div>
          <div className="pokemon-trainer">Pokemon Trainer</div>
        </div>
      </div>
      <div className="notification-icon">
        <img src={Bell} alt="Imagen de la persona" />
      </div>
    </div>
  );
}

export default Header;
