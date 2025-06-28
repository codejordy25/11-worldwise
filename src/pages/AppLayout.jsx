//Il s'agit de la page de mise en page principale de l'application

import AppNav from "../components/AppNav";

function AppLayout() {
  return (
    <div>
      Bienvenue dans la mise en page de l'application!
      <AppNav />
      <p>App</p>
    </div>
  );
}

export default AppLayout;
