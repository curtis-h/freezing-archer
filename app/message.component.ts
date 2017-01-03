import {Component, OnInit} from '@angular/core';

import {MessageService} from './message.service';

@Component({
  selector: 'message',
  template: `
    <div>

    </div>
  `
})

export class MessageComponent implements OnInit {
  message: any;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.get().subscribe(message => this.message = message);
  }
}
