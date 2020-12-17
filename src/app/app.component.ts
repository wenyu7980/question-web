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
  mistakes: number[] = [];

  index = 0;
  answer: string;
  gotoIndex: FormControl;
  mistakeMode: boolean;
  randomMode: boolean;

  constructor(private httpClient: HttpClient) {
    this.location = localStorage;
  }

  ngOnInit(): void {
    this.index = +this.location.getItem('index');
    // 错题集
    if (this.location.getItem('mistakes')) {
      this.mistakes = JSON.parse(this.location.getItem('mistakes'));
    }
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
    let index = this.index - 1;
    if (this.mistakeMode) {
      index = this.mistakes?.[0] ?? 0;
      for (const i of this.mistakes.reverse()) {
        if (i < this.index) {
          index = i;
          break;
        }
      }
    }
    this.goto(index);

  }

  next() {
    let index = this.index + 1;
    if (this.randomMode) {
      index = Math.round(Math.random() * 1000) % this.questions.length;
    }
    if (this.mistakeMode) {
      index = this.mistakes?.[0] ?? 0;
      for (const i of this.mistakes) {
        if (i > this.index) {
          index = i;
          break;
        }
      }
    }
    this.goto(index);
  }

  goto(index: number) {
    if (index < 0) {
      index = this.questions.length - 1;
    }
    index = index % this.questions.length;
    this.index = index;
    this.question = this.questions[this.index];
    this.answer = '';
    this.location.setItem('index', index + '');
  }

  answerChange($event: string) {
    if (this.question.answer !== $event) {
      for (const i of this.mistakes) {
        if (i === this.index) {
          return;
        }
      }
      this.mistakes.push(this.index);
      this.mistakes = this.mistakes.sort((i, j) => i - j);
      this.location.setItem('mistakes', JSON.stringify(this.mistakes));
    }
  }
}

interface Question {
  question: string;
  answer: string;
  analysis: string;
  options: string[];
}

