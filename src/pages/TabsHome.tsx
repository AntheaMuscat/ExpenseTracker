// TabsHome.tsx
import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import Home from './Home';

import { card, settings} from 'ionicons/icons';
import Preferences from './Preferences';
import Expenses from './Expenses';

const TabsHome: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/expenses" />
        <Route exact path="/tabs/expenses">
          <Expenses/>
        </Route>
        <Route path="/tabs/preferences">
          <Preferences/>
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="settings" href="/tabs/expenses">
          <IonIcon icon={card}></IonIcon>
          <IonLabel>Expanses</IonLabel>
        </IonTabButton>
        <IonTabButton tab="home" href="/tabs/preferences">
          <IonIcon icon={settings}></IonIcon>
          <IonLabel>Preferences</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default TabsHome;
