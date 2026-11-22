import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { switchMap } from 'rxjs';
import { Movie } from '../../interfaces/movie';

@Component({
  imports: [],
  selector: 'app-movie-detail',
  styleUrl: './movie-detail.css',
  templateUrl: './movie-detail.html',
})
export class MovieDetail implements OnInit {
  private readonly router = inject(Router, { optional: true });
  private readonly route = inject(ActivatedRoute, { optional: true });
  protected readonly movieService = inject(MovieService);

  ngOnInit(): void {
    if (!this.route) {
      return;
    }

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = Number(params.get('id'));
          return this.movieService.getMovieById(id);
        }),
      )
      .subscribe((movie) => this.movieService.selectedMovie.set(movie));
  }
  backToMovieList(){
    this.router?.navigate(['/']);
  }
  addToWishList(movie:Movie){
    this.movieService.addToWishList(movie);
  }
}


