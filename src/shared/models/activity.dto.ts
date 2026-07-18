export interface ActivityDto {

  id: string;

  type:
    | 'created'
    | 'updated'
    | 'favorite'
    | 'pinned'
    | 'archived'
    | 'deleted';

  title: string;

  date: Date;
}