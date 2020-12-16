import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {debounceTime, filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'question';
  questions: Question[];
  private location: Storage;
  question: Question;

  index = 0;
  answer: string;
  gotoIndex: FormControl;

  constructor(private httpClient: HttpClient) {
    this.location = localStorage;
  }

  ngOnInit(): void {
    this.index = +this.location.getItem('index');
    this.httpClient.get<Question[]>('/assets/questions.json').subscribe(
      data => {
        this.questions = data;
        if (this.index >= this.questions.length) {
          this.index = this.questions.length - 1;
        }
        this.goto(this.index);
      }
    );
    this.gotoIndex = new FormControl();
    this.gotoIndex.valueChanges.pipe(
      debounceTime(100),
      filter(i => i !== '')
    ).subscribe(i => {
      this.goto(i - 1);
    });
  }

  pre() {
    this.goto(this.index - 1);
  }

  next() {
    this.goto(this.index + 1);
  }

  goto(index: number) {
    this.index = index;
    this.question = this.questions[this.index];
    this.answer = '';
    this.location.setItem('index', index + '');
  }
}

interface Question {
  question: string;
  answer: string;
  analysis: string;
  options: string[];
}

