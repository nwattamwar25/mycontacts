import React from 'react'
import Button from '../ui/Button';
import Card from '../ui/Card';
import classes from "./Display.module.css"
import ReactDom from "react-dom"

const Backdrop = (props) => {
    // Changed to use onCancel instead of onConfirm for backdrop click
    return <div className={classes.backdrop} onClick={props.onCancel}></div>
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
                {props.showCancelButton && (
                    <Button 
                        onClick={props.onCancel}
                        className={classes.cancelButton}
                    >
                        Cancel
                    </Button>
                )}
            </footer>
        </Card>
    );
}

const Display = (props) => {
    return (
        <React.Fragment>
            {ReactDom.createPortal(
                <Backdrop 
                    onCancel={props.onCancel || props.onConfirm} 
                />, 
                document.getElementById("backdrop-root")
            )}
            {ReactDom.createPortal(
                <ModalOverlay 
                    title={props.title} 
                    message={props.message} 
                    onConfirm={props.onConfirm}
                    onCancel={props.onCancel}
                    showCancelButton={props.showCancelButton}
                />,
                document.getElementById("overlay-root")
            )}
        </React.Fragment>
    )
}

export default Display;