import React from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonToast } from '@ionic/react';
import axios from 'axios';

const Status: React.FC = () => {
    const [status, setStatus] = React.useState("");
    const [ip, setIp] = React.useState("");
    const [showToast, setShowToast] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState("");
    const [toastColor, setToastColor] = React.useState("primary");

    React.useEffect(() => {
        axios.get(`http://${window.location.hostname}:4000/status`)
        .then(result => setStatus(result.data.status))
        .catch(err => console.error(err))
        // axios.get(`http://${window.location.hostname}:4000/getIp`)
        // .then(result => setIp(result.data))
        // .catch(err => console.error(err))
    }, []);

    const startServer = () => {
        axios.get(`http://${window.location.hostname}:4000/boot`)
        .then(res => {
            setToastMessage(res.data)
            setToastColor("success")
            setShowToast(true)
        })
        .catch(err => {
            setToastMessage("Something went wrong 😅")
            setToastColor("danger")
            setShowToast(true)
        })
        
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Status</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Status</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>
                    <IonRow>
                        <IonCol></IonCol>
                        <IonCol>
                            Status: {status}
                        </IonCol>
                        <IonCol></IonCol>
                    </IonRow>
                    {
                        ip && 
                        <IonRow>
                            <IonCol></IonCol>
                            <IonCol>
                                IP: {ip}
                            </IonCol>
                            <IonCol></IonCol>
                        </IonRow>
                    }
                    <IonRow>
                        <IonCol></IonCol>
                        <IonCol>
                            {
                                status !== "online" && <IonButton expand='block' onClick={startServer}>Start server</IonButton>
                            }
                        </IonCol>
                        <IonCol></IonCol>
                    </IonRow>
                </IonGrid>
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    color={toastColor}
                    position="top"
                    duration={2000}
                />
            </IonContent>
        </IonPage>
    );
};

export default Status;
