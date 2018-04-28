import { Component, OnInit } from '@angular/core';
import { DndListComponent } from '../../components/dnd-list/dnd-list.component';
import { WishService } from '../../services/wish.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent extends DndListComponent implements OnInit {
  constructor(private wishService: WishService) {
    super();
  }

  ngOnInit() {
    this.getWishes();
  }

  getWishes() {
    this.wishService.getWishes().subscribe( wishes => this.list = wishes );
  }

}