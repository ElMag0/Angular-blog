import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "../shared/interfaces";

// SearchPipe зарегать в админском модуле

@Pipe ({
    name: 'SearchPosts'
})

export class SearchPipe implements PipeTransform {
// Входящий параметр - массив рosts, принимаемый параметр - некоторый search: '', кот. буд. получ. из инпута 
    transform(posts: Post[], search: ''): Post[] {
        // Если в строке search - ничего нет, вернуть массив постов
        if(!search.trim()) {
            return posts
        }
// Фильтр массива, на кажд. итерац. возвр. пост, если в его заголовке есть search
        return posts.filter(post => {
            return post.title.toLowerCase().includes(search.toLowerCase())
        })
    }
    
}

