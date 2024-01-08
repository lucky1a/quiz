import '../css/Toggle.css';
import { Container } from "react-bootstrap";

const ToggleSwitch = ({ group, setGroup }) => {
    // const [isChecked, setIsChecked] = useState(false);

    const handleOnChange = () => {
        setGroup(!group);
        console.log(`Gorup ${group ? 'OFF' : 'ON'}`);
    };

    return (
        <Container>
            Group Answers
            <label className="switch position-relative start-0 m-3">
                <input
                    type="checkbox"
                    checked={ group }
                    onChange={ handleOnChange }
                />
                <span className="slider round"></span>
            </label>
        </Container>
    );
};

export default ToggleSwitch;