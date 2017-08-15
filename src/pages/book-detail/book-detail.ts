import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LibraryService} from "../../services/library.service";
import {BookDetail, BookItem} from "../../classes/book";
import {CollectionService} from "../../services/collection.service";



@IonicPage()
@Component({
  selector: 'page-book-detail',
  templateUrl: 'book-detail.html',
})
export class BookDetailPage {
  id:string;
  base:string;
  book:BookDetail;
  items:BookItem[];
  loading:Loading;
  isCollected:boolean=false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private librarySvc: LibraryService,
    private collectionSvc: CollectionService,
    private loadingCtrl: LoadingController
  ) {}

  ionViewWillLoad(){
    this.loading=this.loadingCtrl.create({
      spinner: 'dots',
      content: '加载中'
    });
    this.loading.present();
  }

  ionViewDidLoad(){
    this.id=this.navParams.get('id');
    this.base=this.navParams.get('base');
    if (!this.base) {
      this.base='ZJU01';
    }
    this.librarySvc.bookDetail(this.base,this.id).then(book=>{
      console.log(book);
      this.book=book;
      this.isCollected=this.collectionSvc.isCollected(this.book.id);
      this.librarySvc.bookItems(this.base,this.id).then(items=>{
        console.log(items);
        this.items=items;
        this.loading.dismiss();
      });
    });
  }

  get borrowedItemsCount():number{
    let count=0;
    for(let item of this.items){
      if (item.borrowed) {
        count++;
      }
    }
    return count;
  }

  toggleCollect(){
    if (this.isCollected) {
      this.collectionSvc.unCollect(this.book.id).then(()=>{
        this.isCollected=false;
      });
    }else{
      this.collectionSvc.collect({
        bookId:this.book.id,
        title:this.book.title,
        author:this.book.author,
        callNumber:this.items.length>0?this.items[0].callNumber:'',
        press:this.book.press.name,
        year:this.book.year
      }).then(()=>{
        this.isCollected=true;
      });
    }
  }

}
