import React from "react";
import Styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Artists } from "../../data/artists";
import { useSelector } from "react-redux";

export const Info = () => {
  const { Id } = useParams();
  const list = useSelector((state) => state.storeMain.artists);
  const artist = list.find((item) => item.id === parseInt(Id));

  const [cov, setCov] = React.useState(artist?.cover);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [artist]);

  return (
    <Container>
      <Link to="/artists">
        <CgClose size={34} color="#011e2e" className="close" />
      </Link>
      <Wrapper>
        <Wrapper2>
          <Cover src={cov} alt="ELAN" />
          <GalleryMobile>
            {artist?.cover != "" ? (
              <img
                src={artist?.cover}
                className={cov != artist?.cover ? "img" : "imgSelected"}
                onClick={() => setCov(artist?.cover)}
              />
            ) : (
              <div></div>
            )}
            {artist?.images[0] != "" ? (
              <img
                src={artist?.images[0]}
                className={cov != artist?.images[0] ? "img" : "imgSelected"}
                onClick={() => setCov(artist?.images[0])}
              />
            ) : (
              <div></div>
            )}
            {artist?.images[1] != "" ? (
              <img
                src={artist?.images[1]}
                className={cov != artist?.images[1] ? "img" : "imgSelected"}
                onClick={() => setCov(artist?.images[1])}
              />
            ) : (
              <div></div>
            )}
            {artist?.images[2] != "" ? (
              <img
                src={artist?.images[2]}
                className={cov != artist?.images[2] ? "img" : "imgSelected"}
                onClick={() => setCov(artist?.images[2])}
              />
            ) : (
              <div></div>
            )}
            {artist?.images[3] != "" ? (
              <img
                src={artist?.images[3]}
                className={cov != artist?.images[3] ? "img" : "imgSelected"}
                onClick={() => setCov(artist?.images[3])}
              />
            ) : (
              <div></div>
            )}
            {artist?.images[4] != "" ? (
              <img
                src={artist?.images[4]}
                className={cov != artist?.images[4] ? "img" : "imgSelected"}
                onClick={() => setCov(artist?.images[4])}
              />
            ) : (
              <div></div>
            )}
          </GalleryMobile>
          <About>
            <Name>
              <span>{artist?.firstName}</span>
              <span>{artist?.lastName}</span>
            </Name>
            <OtherInfo>
              <Item>
                <b>Profession:</b> {artist?.profession}
              </Item>
              <Item>
                <b>Languages:</b> {artist?.languages}
              </Item>
              <Item>
                <b>Phone Number:</b> {artist?.phoneNumber}
              </Item>
              <Item>
                <b>Adress:</b> {artist?.adress[0] + " " + artist?.adress[1]}
              </Item>
            </OtherInfo>
            <Icons>
              <div>
                <a
                  href={artist?.Instagram}
                  target="_blank"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FaInstagram size={26} color="#320e24" className="icon" />
                </a>
              </div>

              <div>
                <a
                  href={artist?.whatsApp}
                  target="_blank"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FaWhatsapp size={26} color="#320e24" className="icon" />
                </a>
              </div>
            </Icons>
            <Description>{artist?.descriptionGeo}</Description>
            <Gallery>
              {artist?.cover != "" ? (
                <img
                  src={artist?.cover}
                  className={cov != artist?.cover ? "img" : "imgSelected"}
                  onClick={() => setCov(artist?.cover)}
                />
              ) : (
                <div></div>
              )}
              {artist?.images[0] != "" ? (
                <img
                  src={artist?.images[0]}
                  className={cov != artist?.images[0] ? "img" : "imgSelected"}
                  onClick={() => setCov(artist?.images[0])}
                />
              ) : (
                <div></div>
              )}
              {artist?.images[1] != "" ? (
                <img
                  src={artist?.images[1]}
                  className={cov != artist?.images[1] ? "img" : "imgSelected"}
                  onClick={() => setCov(artist?.images[1])}
                />
              ) : (
                <div></div>
              )}
              {artist?.images[2] != "" ? (
                <img
                  src={artist?.images[2]}
                  className={cov != artist?.images[2] ? "img" : "imgSelected"}
                  onClick={() => setCov(artist?.images[2])}
                />
              ) : (
                <div></div>
              )}
              {artist?.images[3] != "" ? (
                <img
                  src={artist?.images[3]}
                  className={cov != artist?.images[3] ? "img" : "imgSelected"}
                  onClick={() => setCov(artist?.images[3])}
                />
              ) : (
                <div></div>
              )}
              {artist?.images[4] != "" ? (
                <img
                  src={artist?.images[4]}
                  className={cov != artist?.images[4] ? "img" : "imgSelected"}
                  onClick={() => setCov(artist?.images[4])}
                />
              ) : (
                <div></div>
              )}
            </Gallery>
          </About>
        </Wrapper2>
      </Wrapper>
    </Container>
  );
};

const Container = Styled.div`
   position: fixed;
   top: 1vw;
   left: 0;
   width: 100%;
   min-height: 101vh;
   padding-bottom: 1vw;
   height: auto;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   z-index: 100;
   background: #fff;

   @media only screen and (max-width: 1100px) {
    position: absolute;
    justify-content: start;
    height: auto;
    padding-bottom: 10vw;
    top: 20vw;
  }
   

   .close {
    position: absolute;
    right: 2vw;
    top: 7vw;
    cursor: pointer;

    @media only screen and (max-width: 1100px) {
      right: 4vw;
      top: 4vw;
    }
    
   }

`;

const Close = Styled.div`

`;

const Wrapper = Styled.div`
    background: #FFC6E9;
    width: 55vw;
    height: auto;
    border-radius: 1.2vw;
    display: flex;
    flex-direction: column;
    padding: 2vw;

    @media only screen and (max-width: 1100px) {
      width: 80vw;
      height: auto;
      margin-top: 15vw;
      padding-bottom: 10vw;
    }
`;
const Wrapper2 = Styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 1100px) {
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding-top: 5vw;
  }

`;

const Cover = Styled.img`
    width: 25vw;
    height: 29vw;
    object-fit: cover;
    border-radius: 1.2vw;
    box-shadow: 0 0 2px 5px rgba(255, 255, 255, 0.9);

    @media only screen and (max-width: 1100px) {
      width: 70vw;
    height: 90vw;
    }
`;

const About = Styled.div`
    width: 27vw;
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 1100px) {
      width: 70vw;
      justify-content: start;
      align-items: start;
      padding-top: 5vw;
    }
`;

const Name = Styled.div`
   display: flex;
   gap: 5px;
   font-size: 2vw;

   & > span {
    font-weight: bold;
    letter-spacing: 0.05vw;
    color: #011E2E;
   }

   @media only screen and (max-width: 1100px) {
    font-size: 5vw;
  }
`;

const Item = Styled.span`
    font-size: 1.1vw;
    letter-spacing: 0.03vw;
    color: #011E2E;

    @media only screen and (max-width: 1100px) {
      font-size: 4vw;
    }
`;
const Description = Styled.span`
    font-size: 1.1vw;
    letter-spacing: 0.03vw;
    color: #011E2E;
    height: auto;
    margin-top: 1vw;
    font-size: 0.9vw;
    margin-bottom: 1vw;

    @media only screen and (max-width: 1100px) {
      height: auto;
      font-size: 3vw;
      margin-top: 3vw;
    }
`;

const OtherInfo = Styled.div`
   display: flex;
   flex-direction: column;
   gap: 0.3vw;
   margin-top: 2vw;

   @media only screen and (max-width: 1100px) {
    width: 70vw;
    margin-top: 4vw;
  }
`;

const Icons = Styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  gap: 0.3vw;
  align-items: center;
  padding: 0.2vw 0;
  margin-top: 1.2vw;

  @media only screen and (max-width: 1100px) {
    gap: 3vw;
    margin-top: 3vw
  }

  & > div {
      background: white;
      padding: 0.3vw;
      border-radius: 0.5vw;
      width: 2vw;
      height: 2vw;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      @media only screen and (max-width: 1100px) {
        padding: 3vw;
        border-radius: 50%;
      }
  }

.icon{
  transition: ease 200ms;
  cursor: pointer;
}
`;

const Gallery = Styled.div`
    display: flex;
    gap: 0.5vw;
    margin-top: 1vw;

    @media only screen and (max-width: 1100px) {
      display: none;
    }

    & > .img {
        width: 4vw;
        height: 4vw;
        object-fit: cover;
        border-radius: 0.5vw;
        box-shadow: 0 0 1px 3px rgba(255, 255, 255, 0.6);
        cursor: pointer;
        filter: brightness(0.6);
        transition: ease 200ms;

        &:hover {
          filter: brightness(1)
        }
    }
    & > .imgSelected {
        width: 4vw;
        height: 4vw;
        object-fit: cover;
        border-radius: 0.5vw;
        box-shadow: 0 0 1px 3px rgba(255, 255, 255, 0.6);
        cursor: pointer;
        transition: ease 200ms;
    }
`;
const GalleryMobile = Styled.div`
    display: none;
    @media only screen and (max-width: 1100px) {
     display: flex;
     margin-top: 5vw;
     gap: 2vw;
    & > .img {
        width: 10vw;
        height: 10vw;
        object-fit: cover;
        border-radius: 10px;
        box-shadow: 0 0 1px 3px rgba(255, 255, 255, 0.6);
        cursor: pointer;
        filter: brightness(0.6);
        transition: ease 200ms;

        &:hover {
          filter: brightness(1)
        }
    }
    & > .imgSelected {
        width: 10vw;
        height: 10vw;
        object-fit: cover;
        border-radius: 10px;
        box-shadow: 0 0 1px 3px rgba(255, 255, 255, 0.6);
        cursor: pointer;
        transition: ease 200ms;
    }
  }
`;
