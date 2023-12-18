import { Button, IconButton, Snackbar, TextField } from "@mui/material";
import { ChangeEvent, Fragment, TextareaHTMLAttributes, useContext, useEffect, useState } from "react";
import * as bip39 from 'bip39';
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { WalletContext } from "../../context/walletContext";

interface PropTypes {
    isCustom: boolean;
}

export default function NewMnemonic({ isCustom }: PropTypes) {

    const [newMnemonic, setNewMnemonic] = useState<string[]>(Array(12).fill(""));
    const [customMnemonic, setCustomMnemonic] = useState({});
    const [moveNext, setMoveNext] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const { setMnemonic } = useContext(WalletContext);

    const navigate = useNavigate();

    useEffect(() => {
        const newOne = bip39.generateMnemonic();
        setNewMnemonic(newOne.split(' '));
    }, []);

    useEffect(() => {
        let count = 0;
        Object.keys(customMnemonic).forEach((key) => {
            if (customMnemonic[key as keyof typeof customMnemonic]) {
                count++;
            }
        });

        if (count === 12) {
            setMoveNext(true);
        } else {
            setMoveNext(false);
        }
    }, [customMnemonic])



    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        setCustomMnemonic({ ...customMnemonic, [`${index}` as keyof typeof customMnemonic]: e.target.value });
    }

    const handleNext = () => {
        if (isCustom) {
            Object.keys(customMnemonic).map((key, index) => {
                return customMnemonic[`${index}` as keyof typeof customMnemonic];
            })
            setMnemonic(Object.keys(customMnemonic).map((key, index) => {
                return customMnemonic[`${index}` as keyof typeof customMnemonic];
            }));
        } else {
            setMnemonic(newMnemonic);
        }

        navigate("/create/set-password");
    }

    const handlePrevious = () => {
        navigate("/create");
    }

    const closeAlert = () => {
        setOpenAlert(false);
    }

    const action = (
        <Fragment>
            <Button color="secondary" size="small" onClick={closeAlert}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={closeAlert}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    return (
        <Fragment>
            <div className="w-full flex flex-row flex-wrap justify-between">
                {
                    isCustom ? Array(12).fill("").map((item, index) => {
                        return (
                            <TextField label={index + 1} key={"custom" + index} className="w-[30%] !mb-3" value={customMnemonic[`${index}` as keyof typeof customMnemonic] ?? ""} onChange={(e) => { handleChange(e, index) }}></TextField>
                        )
                    }) : newMnemonic.map((item, index) => {
                        return (
                            <TextField label={index + 1} key={index} className="w-[30%] !mb-3" value={item} disabled></TextField>
                        )
                    })
                }
            </div>
            {!isCustom && <div className="w-full flex flex-row justify-between mb-3">
                <Button onClick={() => setOpenAlert(true)}>Copy mnemonic to clipboard.</Button>
            </div>}
            <div className="w-full flex flex-row justify-between">
                <Button variant="outlined" onClick={handlePrevious}>Previous</Button>
                <Button variant="outlined" disabled={!isCustom ? false : (moveNext ? false : true)} onClick={handleNext}>Next</Button>
            </div>
            {
                !isCustom && <Snackbar
                    open={openAlert}
                    autoHideDuration={6000}
                    onClose={closeAlert}
                    message="Copied."
                    action={action}
                ></Snackbar>
            }
        </Fragment>
    )
}