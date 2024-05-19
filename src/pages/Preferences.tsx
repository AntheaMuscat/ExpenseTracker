import { IonContent,IonList, IonItem, IonInput, IonHeader, IonPage, IonTitle,IonLabel, IonToolbar, IonToggle, InputCustomEvent, IonFooter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import React, { useState } from 'react';

const Preferences: React.FC = () => {

  const [name, setName] = useState<string[]>(() => {
    const storedTitle = localStorage.getItem("name");
    return storedTitle ? JSON.parse(storedTitle) : [""];
});
  const [toggleState, setToggleState] = useState(() => {
    const storedToggleState = localStorage.getItem("themeToggle");
    return storedToggleState ? JSON.parse(storedToggleState) : true;
  });

  const[color, setColor] = useState(() =>{
    const storedColor = localStorage.getItem('themeColor');
    return storedColor ? JSON.parse(storedColor) : 'tertiary';
  });
const handleChange = (event: InputCustomEvent) => {
    const newName = event.detail.value!;
    setName(newName);
    localStorage.setItem("name", JSON.stringify(newName));
};

const changeColor = () => {
  let newToggleState;
  let newColor;
  
  if (toggleState == true) {
    newToggleState = false;
    newColor = 'medium';
  } else {
    newToggleState = true;
    newColor = 'tertiary';
  }

  setToggleState(newToggleState);
  setColor(newColor);
  localStorage.setItem('themeToggle', JSON.stringify(newToggleState));
  localStorage.setItem('themeColor', JSON.stringify(newColor));
};
  return (
    
    <IonPage>
      <IonHeader>
        <IonToolbar color={color}>
          <IonTitle>Preferences</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonList>
                    <IonItem>
                        <IonInput label='Registered to: ' value={name} labelPlacement='floating' onIonInput={handleChange}></IonInput>
                    </IonItem>
    </IonList>
    <div className='ion-padding'>
    <IonLabel>Color Theme:</IonLabel>
    <IonToggle id='toggle' checked={toggleState} onIonChange={changeColor} className='ion-float-right ion-padding-end'></IonToggle>
    </div>
    
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
};

export default Preferences;
