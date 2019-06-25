
export function formVinTable(vinsTable){
    let vinTable_sort_arr = Object.entries(vinsTable).sort(function(a, b) {
        if (a[1]<b[1]) return 1;
        if (a[1]>b[1]) return -1;
      });
      let vinTableMessage = '';
      for (let i=0; i<vinTable_sort_arr.length; i++) {
        vinTableMessage += vinTable_sort_arr[i].join(' : ') + '\n\r';
      }
      return vinTableMessage;
};