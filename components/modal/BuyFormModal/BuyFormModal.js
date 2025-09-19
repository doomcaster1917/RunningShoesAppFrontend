import React, {useState} from 'react';
import cl from './BuyFormModal.module.scss'
import backendAddr from "../../../config";

export default function BuyFormModal ({tgToken, itemName, setModalMode}) {
    const [isSent, setIsSent] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')
    async function sendValue() {
        if (!isSent) {
            let response = await fetch(`${backendAddr}/notificate`, {
                method: "post",
                body: JSON.stringify({
                    token: tgToken,
                    item_name: itemName,
                })
            })
            if (response.status === 200) {
                setResponseMessage('Ваша заявка отправлена')
                setIsSent(true)
            }
        }
    }
    return (
        <>
            <div className={cl.MainModal} onClick={() => setModalMode(false)}>
            </div>
            <div className={cl.MainModalContent}>
                <button className={cl.close_button} onClick={() => setModalMode(false)}/>
                При нажатии на кнопку ваша заявка будет отправлена менеджеру.
                С вами скоро свяжутся.
                <button onClick={sendValue}>Отправить заявку</button>
                {responseMessage}
            </div>
        </>
    );
};

