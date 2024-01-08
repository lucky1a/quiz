import { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';



const IS_SERVER = typeof window === 'undefined';

let storedTheme = IS_SERVER ? 'light' : localStorage.getItem('theme');

const arrayOfThemes = [
    { name: 'Light', icon: '☀️' },
    { name: 'Dark', icon: '🌙' },
    // { name: 'Blue', icon: '🟦' }, //Add your own themes!
];

//Modifies the html root element
function modifyDOM(theme) {
    if (
        theme === 'dark' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-bs-theme', theme);
    }
}
console.log('"ran"', "ran")

const ThemeSelector = ({ theme, setTheme }) => {
    const [mode, setMode] = useState(getPreferredTheme());

    useEffect(() => {
        if (IS_SERVER) return;
        modifyDOM(mode);
    }, []);

    function getPreferredTheme() {
        if (storedTheme) {
            return storedTheme;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    }

    function setPreferredTheme(theme) {
        modifyDOM(theme)

        localStorage.setItem('theme', theme);
        setMode(theme);
    }

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <>
            <Dropdown className='position-absolute end-0'>
                <Dropdown.Toggle variant="primary" id="dropdown-basic" >

                    {
                        arrayOfThemes.find((theme) => theme.name.toLowerCase() === mode)
                            ?.icon
                    }{ ' ' }

                </Dropdown.Toggle>
                <Dropdown.Menu>

                    { arrayOfThemes.map((theme) => {
                        const active = mode === theme.name.toLowerCase();
                        return (
                            <Dropdown.Item
                                key={ theme.name }
                                className={ active ? 'active' : '' }
                                onClick={ () => {
                                    setPreferredTheme(theme.name.toLocaleLowerCase());
                                } }
                            >
                                { ' ' }
                                { theme.icon } { theme.name } { active ? '✔️' : '' }
                            </Dropdown.Item>
                        );
                    }) }
                </Dropdown.Menu>

            </Dropdown >

        </>
    );
};

export default ThemeSelector;