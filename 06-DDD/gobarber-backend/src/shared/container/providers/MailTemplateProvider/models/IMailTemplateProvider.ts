import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

interface IMailTempalteProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}

export default IMailTempalteProvider;
