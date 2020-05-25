export default interface ICreateContactDTO {
  user_id: string;
  name: string;
  type: 'email' | 'number';
  value: string;
}
