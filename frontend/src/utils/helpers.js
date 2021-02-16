export const getBtnSaveText = (isLoading = false) => {
  if (isLoading) {
    return 'Сохранение...';
  }

  return 'Сохранить';
}


export const getBtnCreateText = (isLoading = false) => {
  if (isLoading) {
    return 'Создание...';
  }

  return 'Создать';
}
