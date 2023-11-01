import { ToolType } from './tool';

interface cats {
  id: number;
}

interface parent {
  id: number;
  categoryname: string;
  level: number;
  cats: cats[] | null;
  schooltools: ToolType[];
  parent: null;
}

interface parents {
  id: number;
  categoryname: string;
  level: number;
  cats: cats[] | null;
  schooltools: ToolType[];
  parent: parent;
}

export interface CategoryType {
  id: number;
  categoryname: string;
  level: number;
  cats: cats[] | null;
  schooltools: ToolType[];
  parent: parents;
}
