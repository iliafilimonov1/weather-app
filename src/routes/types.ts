export interface RouteItem {
  /* Путь маршрута */
  path: string;
  /* Компонент для рендера */
  element: React.ReactNode;
  /* Дочерние маршруты */
  children?: RouteItem[];
}
