import { IonContent, IonHeader,IonAlert, IonList, IonItemSliding, IonItemOptions,IonText, IonItem, IonLabel, IonInput, IonButton, IonPage, IonTitle, IonToolbar, InputCustomEvent, IonFooter, IonButtons, IonBadge } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import React, { useState } from 'react';

const Expenses: React.FC = () => {

  const [showAlert, setShowAlert] = useState(false); //handles visibility of alert



  const[color, setColor] = useState(() =>{
    const storedColor = localStorage.getItem('themeColor');
    return storedColor ? JSON.parse(storedColor) : 'tertiary';
  });
  

  //dimisses the alert
  const handleAlertDismiss = () => {
    setShowAlert(false);
  };
    
  const [userInput, setUserInput] = useState('');
  const [userItems, setUserItems] = useState<string[]>(() => {
    const storedArray = localStorage.getItem("expansesArray");
    return storedArray ? JSON.parse(storedArray) : [];
  });


  const addInput = () => {
    if (!userInput.trim()) { //check if input is empty
      setShowAlert(true); //if yes show the alert
      return;// else add the input to the userItems
    }
    const tempNotesArray = [...userItems, userInput]
    //The tempNotesArray was added to ensure that we always save the lateset version of the note list
    setUserItems(tempNotesArray);
    //[...items, input] essentialy opens the items array and adds input
    //at the bottom of the array.
    //It is equivalant of items.push[input]
    localStorage.setItem("expansesArray", JSON.stringify(tempNotesArray));
  }

  const deleteItems = (index: number) => {
      const tempArray = [];
      for(var i = 0; i <userItems.length; i++){
        if(i !== index){
        tempArray.push(userItems[i]);

        }
      setUserItems(tempArray);
      localStorage.setItem("expansesArray", JSON.stringify(tempArray));
      const slider = document.querySelector('ion-list');
      if(slider){
        slider.closeSlidingItems();
      }
    }
  }
  const getName = () => {
    const storedName = localStorage.getItem("name");
    return storedName ? JSON.parse(storedName) : [""];
  };
  

  



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={color}>
          <IonTitle className='ion-text-center'>Expense Tracker <IonBadge color={'danger'}>{userItems.length}</IonBadge></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding' fullscreen>



        <IonList>
          {userItems.map((obj, index) => (
            <IonItemSliding >
              <IonItemOptions side="end" onIonSwipe={() => deleteItems(index)}>
              <IonText style={{ display: 'block', verticalAlign: 'top' }} color={'danger'}>Swipe to Delete</IonText>
              </IonItemOptions>
              <IonItem id={`${index}item`}>
                <IonLabel>{obj}</IonLabel>
                <IonButtons>
                  <IonButton onClick={() => deleteItems(index)}  fill='solid' slot='end' color={'danger'}>
                    Delete
                  </IonButton>
                </IonButtons>
              </IonItem>
            </IonItemSliding>
          ))}
        </IonList>

        <div style={{ position: 'fixed', bottom: '0', left: '0', width: '100%' }} className='ion-padding'>
          <IonList >
            <IonItem>
              <IonInput placeholder='Add new expense' onIonInput={(event: InputCustomEvent) => setUserInput(event.detail.value!)}></IonInput>
            </IonItem>
          </IonList>
          <IonButton className='ion-margin-start' color={color} onClick={addInput}>Add</IonButton>
          <div  style={{display: 'block'}} className='ion-padding ion-text-center'>
          <IonText ><sub>Registered by:</sub></IonText><IonText color={'primary'}><sub>{getName()}</sub></IonText>
          </div>
          
        </div>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={handleAlertDismiss}
          header={'Error'}
          message={'You must enter an expense'}
          buttons={['OK']}
        />
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
};

export default Expenses;
