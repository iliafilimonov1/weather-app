export interface NavItem {
  /* Название пункта меню */
  name: string;
  /* Путь (URL), на который ведет элемент меню */
  path: string;
  /* Иконка пункта меню */
  icon?: React.ReactNode;
}
