import { Injectable } from '@nestjs/common';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class HandlebarsAdapter {
  async compile(template: string, context: any): Promise<string> {
    const templatePath = path.join(__dirname, '../templates', `${template}.hbs`);
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = handlebars.compile(templateSource);
    return compiledTemplate(context);
  }
}
