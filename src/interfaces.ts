export interface launchesPast {
    mission_name: string;
    launch_date_local: string;
    rocket: { rocket_name: string };
  }
  
export interface paginationState {
    offset: number;
    perPage: number;
    currentPage: number;
    size: number;
    pageCount?: number;
    pageData?: any;
  }