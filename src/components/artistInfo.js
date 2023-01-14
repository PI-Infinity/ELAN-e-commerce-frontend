import React from "react";
import Styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Artists } from "../data/artists";

export const Info = () => {
  const { Id } = useParams();
  const artist = Artists.find((item) => item.Id === Id);
  const [cov, setCov] = React.useState(artist?.Cover);

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
            {artist.Cover != "" ? (
              <img
                src={artist.Cover}
                className={cov != artist.Cover ? "img" : "imgSelected"}
                onClick={() => setCov(artist.Cover)}
              />
            ) : (
              <div></div>
            )}
            {artist.Img1 != "" ? (
              <img
                src={artist.Img1}
                className={cov != artist.Img1 ? "img" : "imgSelected"}
                onClick={() => setCov(artist.Img1)}
              />
            ) : (
              <div></div>
            )}
            {artist.Img2 != "" ? (
              <img
                src={artist.Img2}
                className={cov != artist.Img2 ? "img" : "imgSelected"}
                onClick={() => setCov(artist.Img2)}
              />
            ) : (
              <div></div>
            )}
            {artist.Img3 != "" ? (
              <img
                src={artist.Img3}
                className={cov != artist.Img3 ? "img" : "imgSelected"}
                onClick={() => setCov(artist.Img3)}
              />
            ) : (
              <div></div>
            )}
            {artist.Img4 != "" ? (
              <img
                src={artist.Img4}
                className={cov != artist.Img4 ? "img" : "imgSelected"}
                onClick={() => setCov(artist.Img4)}
              />
            ) : (
              <div></div>
            )}
            {artist.Img5 != "" ? (
              <img
                src={artist.Img5}
                className={cov != artist.Img5 ? "img" : "imgSelected"}
                onClick={() => setCov(artist.Img5)}
              />
            ) : (
              <div></div>
            )}
          </GalleryMobile>
          <About>
            <Name>
              <span>{artist.FirstName}</span>
              <span>{artist.LastName}</span>
            </Name>
            <OtherInfo>
              <Item>
                <b>Profession:</b> {artist.Profession}
              </Item>
              <Item>
                <b>Languages:</b> {artist.Languages}
              </Item>
              <Item>
                <b>Phone Number:</b> {artist.Phone}
              </Item>
              <Item>
                <b>Adress:</b> {artist.Adress}
              </Item>
            </OtherInfo>
            <Icons
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
                gap: "0.3vw",
                alignItems: "center",
                padding: "0.2vw 0",
                marginTop: "1.2vw",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "0.3vw",
                  borderRadius: "0.5vw",
                  width: "2vw",
                  height: "2vw",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <a
                  href={artist.Instagram}
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

              <div
                style={{
                  backgroundColor: "white",
                  padding: "0.3vw",
                  borderRadius: "0.5vw",
                  cursor: "pointer",
                  width: "2vw",
                  height: "2vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <a
                  href={artist.WhatsApp}
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
            <Description
              style={{
                marginTop: "1vw",
                fontSize: "0.9vw",
                marginBottom: "1vw",
              }}
            >
              {artist.Description}
            </Description>
            <Gallery>
              {artist.Cover != "" ? (
                <img
                  src={artist.Cover}
                  className={cov != artist.Cover ? "img" : "imgSelected"}
                  onClick={() => setCov(artist.Cover)}
                />
              ) : (
                <div></div>
              )}
              {artist.Img1 != "" ? (
                <img
                  src={artist.Img1}
                  className={cov != artist.Img1 ? "img" : "imgSelected"}
                  onClick={() => setCov(artist.Img1)}
                />
              ) : (
                <div></div>
              )}
              {artist.Img2 != "" ? (
                <img
                  src={artist.Img2}
                  className={cov != artist.Img2 ? "img" : "imgSelected"}
                  onClick={() => setCov(artist.Img2)}
                />
              ) : (
                <div></div>
              )}
              {artist.Img3 != "" ? (
                <img
                  src={artist.Img3}
                  className={cov != artist.Img3 ? "img" : "imgSelected"}
                  onClick={() => setCov(artist.Img3)}
                />
              ) : (
                <div></div>
              )}
              {artist.Img4 != "" ? (
                <img
                  src={artist.Img4}
                  className={cov != artist.Img4 ? "img" : "imgSelected"}
                  onClick={() => setCov(artist.Img4)}
                />
              ) : (
                <div></div>
              )}
              {artist.Img5 != "" ? (
                <img
                  src={artist.Img5}
                  className={cov != artist.Img5 ? "img" : "imgSelected"}
                  onClick={() => setCov(artist.Img5)}
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
   top: 0;
   left: 0;
   width: 100%;
   height: 100vh;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   z-index: 10000;
   background: #f1f1f1;

   @media only screen and (max-width: 1100px) {
    position: absolute;
    justify-content: start;
    height: auto;
    padding-bottom: 10vw;
  }
   

   .close {
    position: absolute;
    right: 2vw;
    top: 2vw;
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

    @media only screen and (max-width: 1100px) {
      height: auto;
      font-size: 3vw;
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
