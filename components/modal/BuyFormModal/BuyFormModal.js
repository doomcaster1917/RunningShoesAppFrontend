import React, {useState} from 'react';
import cl from './BuyFormModal.module.scss'
import backendAddr from "../../../config";
import Link from "next/link";

export default function BuyFormModal ({price, sizes, tgToken, itemName, setModalMode}) {
    const [isSent, setIsSent] = useState(false)
    const [responseMessage, setResponseMessage] = useState('При нажатии на кнопку ваша заявка будет отправлена менеджеру.\n' +
        '                С вами скоро свяжутся.')
    const [phoneNumber, setPhoneNumber] = useState('')
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
                        price: price,
                        phone: phoneNumber
                    })
                })

                if (response.status === 200) {
                    setResponseMessage( <> <span className={cl.finish_notification}>
                        Ваша заявка отправлена. Если у Вас остались вопросы, Вы можете связаться с нами в Telegram по нику <br/>
                        <Link href="https://t.me/maydima">@maydima</Link>.
                        </span>
                    </>)
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
                <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                       placeholder={'Введите ваш номер телефона для связи'} type="text"/>
                {responseMessage}
                <button onClick={sendValue}>Отправить заявку</button>
            </div>
        </>
    );
};

