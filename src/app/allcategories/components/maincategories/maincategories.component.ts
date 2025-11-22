import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories.service';
import { ProductsService } from '../../../shared/services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FavoritesService } from '../../../shared/services/favorites.service';
import { Category } from '../../../shared/models/categories-response';
import { Product } from '../../../shared/models/product-response';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-maincategories',
  templateUrl: './maincategories.component.html',
  styleUrls: ['./maincategories.component.scss']
})
export class MaincategoriesComponent implements OnInit, OnDestroy {
  categories!: Category[];
  products: Product[] = [];
  showCategories = true;
  selectedCategory = '';
  selectedTeam = '';
  showclubs = true;
  showprice = true;
  showAllTeams = false;
  favoritesIds: string[] = [];
  searchSub!: Subscription;
  minPrice?: number;
  maxPrice?: number = 5000;

  teams = [
    { id: 1, name: 'Real Madrid', logo: 'madrid.webp' },
    { id: 2, name: 'Barcelona', logo: 'barca.webp' },
    { id: 7, name: 'Al ahly', logo: 'alahly.webp' },
    { id: 8, name: 'Zamalek', logo: 'zamalek.webp' },
    { id: 3, name: 'Liverpool', logo: 'liverpool.webp' },
    { id: 4, name: 'Arsenal', logo: 'arsenal.webp' },
    { id: 5, name: 'Chelsea', logo: 'chelsea.webp' },
    { id: 6, name: 'Man city', logo: 'city.webp' },
    { id: 9, name: 'Inter miami', logo: 'miami.webp' },
    { id: 10, name: 'Al nasr', logo: 'alnasr.webp' },
    { id: 11, name: 'Another', logo: 'another.webp' },
  ];

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private favoritesService: FavoritesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.loadCategories();
    this.loadFavorites();
    this.initSearchListener();
  }

  ngOnDestroy(): void {
    if (this.searchSub) this.searchSub.unsubscribe();
  }

  private buildParams(extra: any = {}) {
    const params: any = { '[pagination][limit]': 1000 };
    if (this.selectedCategory) params.category = this.selectedCategory;
    if (this.selectedTeam) params.club = this.selectedTeam;
    if (this.minPrice !== undefined && this.minPrice !== null) params['[price][min]'] = Number(this.minPrice);
    if (this.maxPrice !== undefined && this.maxPrice !== null) params['[price][max]'] = Number(this.maxPrice);
    return { ...params, ...extra };
  }

  private fetchProducts(params: any) {
    this.spinner.show();
    this.productsService.getAllProducts(params)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        next: (result) => {
          this.products = (result.data || []).map((prd: any) => ({
            ...prd,
            choosed: !!this.favoritesIds?.includes(prd._id)
          }));
          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 200);
        },
        error: (err) => {
          console.error('fetchProducts error:', err);
        }
      });
  }

  initSearchListener() {
    this.searchSub = this.productsService.search$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(term => {
      const hasFilters =
        !!term ||
        !!this.selectedCategory ||
        !!this.selectedTeam ||
        (this.minPrice !== undefined && this.minPrice !== null) ||
        (this.maxPrice !== undefined && this.maxPrice !== null);

      if (!hasFilters) {
        this.getAllProducts();
        return;
      }

      const params: any = this.buildParams();
      if (term) params.k = term;
      this.fetchProducts(params);
    });
  }

  loadCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (result) => {
        this.categories = result.data || [];
        this.spinner.hide();
      },
      error: (err) => {
        console.error(err);
        this.spinner.hide();
      }
    });
  }

  loadFavorites() {
    this.favoritesService.getFavorites().subscribe({
      next: (result) => {
        this.favoritesIds = (result?.data || []).map((p: any) => p._id);
        // بعد ما عندنا favorites نجيب المنتجات للمرة الأولى
        this.getAllProducts();
      },
      error: (err) => {
        console.error('error in favorites:', err);
        // حتى لو فشل، نجرب نجيب المنتجات بدون favorites
        this.getAllProducts();
      }
    });
  }

  getAllProducts() {
    this.fetchProducts(this.buildParams());
  }

  // UI toggles
  toggleshowing(): void { this.showCategories = !this.showCategories; }
  toggleshowingclubs(): void { this.showclubs = !this.showclubs; }
  toggleshowingprice(): void { this.showprice = !this.showprice; }
  toggleShowingTeams(): void { this.showAllTeams = !this.showAllTeams; }

  onCategoryChange(event: Event) {
    this.selectedCategory = (event.target as HTMLInputElement).value;
    this.fetchProducts(this.buildParams());
  }

  onTeamChange(event: Event) {
    this.selectedTeam = (event.target as HTMLInputElement).value;
    this.fetchProducts(this.buildParams());
  }

  onMinPriceChange(event: any) {
    this.minPrice = event.target.value ? Number(event.target.value) : undefined;
    this.fetchProducts(this.buildParams());
  }

  onMaxPriceChange(event: any) {
    this.maxPrice = event.target.value ? Number(event.target.value) : undefined;
    this.fetchProducts(this.buildParams());
  }

  resetFilters() {
    this.selectedCategory = '';
    this.selectedTeam = '';
    this.minPrice = undefined;
    this.maxPrice = 5000;
    this.showAllTeams = false;

    // أفضل: استخدم form controls بدل التلاعب بالـ DOM — بس لو عايز حل سريع:
    const allCatRadio = document.getElementById('allCategoires') as HTMLInputElement | null;
    if (allCatRadio) allCatRadio.checked = true;

    const categoryRadios = document.querySelectorAll('input[name="category"]') as NodeListOf<HTMLInputElement>;
    categoryRadios.forEach(r => { if (r.id !== 'allCategoires') r.checked = false; });

    const teamRadios = document.querySelectorAll('input[name="team"]') as NodeListOf<HTMLInputElement>;
    teamRadios.forEach(r => r.checked = false);

    const numberInputs = document.querySelectorAll('input[type="number"]') as NodeListOf<HTMLInputElement>;
    numberInputs.forEach(i => i.value = '');

    this.fetchProducts(this.buildParams());
  }
}
