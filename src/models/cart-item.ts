import { ProtutoDTO } from "./produto.dto";

export interface CartItem {
    quantidade: number;
    produto: ProtutoDTO;
}