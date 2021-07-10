import './styles.css';
import { ReactComponent as ArrowIcon } from 'assets/images/Arrow.svg';

type Props = {
  text: string;
}

const ButonIcon = ( {text} : Props) => {
  return (
    <div className="btn-container">
      
        <button className="btn btn-primary">
          <h6>{text}</h6>
        </button>
      
      <div className="btn-icon-container">
        <ArrowIcon />
      </div>
    </div>
  );
};
export default ButonIcon;
