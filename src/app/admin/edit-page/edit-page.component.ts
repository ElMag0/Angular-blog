import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';

//Чтобы редактировать пост, первым делом надо получить его id 

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
//1. Получить информацию текущего роута с помощью ActivatedRoute
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  post: Post
  submitted: false
  uSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) { }

//2. У стрима param вызвать pipe и switchMap, чтобы преобразовать конечный стрим
//3. Сделать запрос к базе данных чтобы получить отдельный пост по его ID, для этого создать метод getById в PS.ts
//4. Передать в текущий роут параметры(id) из getById
  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
      })
    ).subscribe((post: Post)=> {
//7. Вынести полученный post в переменную, чтобы в submit обновлять дефолтные данные с бэкенда
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, [Validators.required]),
        text: new FormControl(post.text, [Validators.required])
      })
    })
  }

  submit() {
    if(this.form.invalid) {
      return
    }

    // this.submitted = true

    this.postsService.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text
    }).subscribe(() => {
      // this.submitted = false
    })
  }

  ngOnDestroy() {
    if(this.uSub) {
      this.uSub.unsubscribe
    }
  }
//5. Инициализировать форму редактирования поста в методе subscribe, чтобы задать контролам дефолтные значения с бека
//6. Связать ее с шаблоном
//8. Создать в PostService  метод update()
//9. Связать форму с обновляемыми данными 
}
