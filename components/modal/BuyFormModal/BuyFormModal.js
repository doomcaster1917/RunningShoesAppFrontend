import React, {useState} from 'react';
import cl from './BuyFormModal.module.scss'
import backendAddr from "../../../config";

export default function BuyFormModal ({sizes, tgToken, itemName, setModalMode}) {
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
                        token: 'user=%7B%22id%22%3A6605938455%2C%22first_name%22%3A%22Doomcaster%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22blueberry1917%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FsSVoYaL7eNGwvD-3Is5I80iHkaAst5nk7btl0kTnHEdlKwmml9bHABqOc0UWVHm3.svg%22%7D&chat_instance=-2591256097955078248&chat_type=sender&auth_date=1758290392&signature=kEN2q_VvBmM3w1J1mBXH5gzx0RSt0M-rQlL2RP_AvNUVyoQtywbDiUC5V9dcTxRiwy_MLNghNxM6K7Epw97tBg&hash=b076033c1675b604bc352c4b62e393e657968553259a76d965e9cd75b2873643',
                        item_name: `${itemName} , размер: ${chosenButton}`,
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

