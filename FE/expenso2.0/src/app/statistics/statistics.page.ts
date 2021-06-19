import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { Chart, registerables } from 'chart.js';

@Component({
  templateUrl: './statistics.page.html'
})
export class StatisticsPage implements OnInit {
  @ViewChild('barChart', {static: true}) public barChart;

  public bars: any;
  public colorArray: any;
  private expenses;

  constructor(private readonly store: Store<{ spendings: [] }>) {
    Chart.register(...registerables);
  }

  public ngOnInit() {
    this.store.select('spendings').subscribe((spendings: any) => {
      console.log(spendings);

      if(spendings[0]) {
        this.expenses = spendings;
        this.createBarChart();
      }
    });


  }

  public createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: [...this.expenses.map((expense) => expense.name)],
        datasets: [{
          label: 'Viewers in millions',
          data: [...this.expenses.map((expense) => expense.expencePercent * 100)],
          // backgroundColor:
        }]
      },
      options: {
        scales: {
        }
      }
    });
  }
}
