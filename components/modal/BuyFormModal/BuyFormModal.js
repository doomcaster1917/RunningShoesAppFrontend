import React, {useState} from 'react';
import cl from './BuyFormModal.module.scss'
import backendAddr from "../../../config";

export default function BuyFormModal ({price, sizes, tgToken, itemName, setModalMode}) {
    const [isSent, setIsSent] = useState(false)
    const [responseMessage, setResponseMessage] = useState('При нажатии на кнопку ваша заявка будет отправлена менеджеру.\n' +
        '                С вами скоро свяжутся.')
    const [chosenButton, setChosenButton] = useState(null)
    async function sendValue() {
        if (!isSent) {
            if (chosenButton) {
                let response = await fetch(`${backendAddr}/notificate`, {
                    method: "post",
                    body: JSON.stringify({
                        token: tgToken,
                        item_name: itemName,
                        size: chosenButton,
                        price: price
                    })
                })
                console.log(response.status)
                if (response.status === 200) {

                    setResponseMessage('Ваша заявка отправлена')
                    setIsSent(true)
                }
            }
            else{
                setResponseMessage('Перед отправкой необходимо выбрать размер')
            }
        }
    }
    return (
        <>
            <div className={cl.MainModal} onClick={() => setModalMode(false)}>
            </div>
            <div className={cl.MainModalContent}>
                <button className={cl.close_button} onClick={() => setModalMode(false)}/>
                <div>
                Выберите размер:
                    <div className={cl.sizes}>

                        {
                            sizes.map((item, index) =>
                                <button
                                    key={index}
                                    onClick={() => setChosenButton(item)}
                                    style={{
                                        backgroundColor: chosenButton === item? '#9932CC':'#E2EDFF'
                                    }}
                                    >{item}</button>
                            )
                        }
                    </div>
                </div>
                {responseMessage}
                <button onClick={sendValue}>Отправить заявку</button>
            </div>
        </>
    );
};

