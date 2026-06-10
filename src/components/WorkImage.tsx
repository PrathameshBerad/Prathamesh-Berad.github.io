import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  link?: string;
}

const WorkImage = ({ image, alt, link }: Props) => {
  return (
    <div className="work-image">
      {link ? (
        <a
          className="work-image-in"
          href={link}
          target="_blank"
          rel="noreferrer"
          data-cursor="disable"
        >
          <div className="work-link">
            <MdArrowOutward />
          </div>
          <img src={image} alt={alt} />
        </a>
      ) : (
        <div className="work-image-in" data-cursor="disable">
          <img src={image} alt={alt} />
        </div>
      )}
    </div>
  );
};

export default WorkImage;
