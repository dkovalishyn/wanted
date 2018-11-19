import { Injectable } from '@angular/core';
import { Wish } from '../../models/wish';
import { Validators } from '@angular/forms';
import { Field } from '../../models/field';
import { TextBox } from '../../models/TextBox';

@Injectable()
export class WishFormService {
  getFields(wish?: Wish): Field<any>[] {
    const fields: Field<any>[] = [
      new TextBox({
        key: 'wish-edit__title',
        name: 'title',
        value: wish ? wish.title : '',
        placeholder: 'Title',
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
        order: 1,
      }),
      new TextBox({
        key: 'wish-edit__description',
        name: 'description',
        value: wish ? wish.description : '',
        placeholder: 'Description',
        validators: [],
        order: 2,
      }),
      new TextBox({
        key: 'wish-edit__ocassion',
        name: 'occasion',
        value: wish ? wish.occasion : '',
        placeholder: 'Occasion',
        validators: [],
        order: 3,
      }),
    ];

    return fields.sort((a, b) => a.order - b.order);
  }
}
