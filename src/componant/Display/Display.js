import React from 'react'
import Button from '../ui/Button';
import Card from '../ui/Card';
import classes from "./Display.module.css"
import ReactDom from "react-dom"

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm}></div>
}

const ModalOverlay = (props) => {
    return (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={classes.content}>
                <p>{props.message}</p>
            </div>
            <footer className={classes.actions}>
                <Button onClick={props.onConfirm}>Okay</Button>
            </footer>
        </Card>
    );
}

const Display = (props) => {
    return (
        <React.Fragment>
            {ReactDom.createPortal(
                <Backdrop onConfirm={props.onConfirm} />, 
                document.getElementById("backdrop-root")
            )}
            {ReactDom.createPortal(
                <ModalOverlay 
                    title={props.title} 
                    message={props.message} 
                    onConfirm={props.onConfirm}
                />,
                document.getElementById("overlay-root")
            )}
        </React.Fragment>
    )
}

export default Display;