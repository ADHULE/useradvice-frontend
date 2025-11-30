let globalNavigate = null;

export const initializeNavigator = (navigate) => {
  globalNavigate = navigate;
};

export const goToPath = (path) => {
  if (!globalNavigate) {
    console.error("Navigator not initialized!");
    return;
  }
  globalNavigate(path);
};
