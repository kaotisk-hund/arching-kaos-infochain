#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

void br(){
	cout << endl;
}
int showCh(const char i[]){
	for (int m=0;m<16;m++){
		cout << i[m];
	}
	cout << endl;
	return 0;
}
int packetCr(const char i[16], const char j[16], const char k[16]){
	char tx[32];
	char u[32], v[32], y[32], x[32];
	// b,a
	// a,b
	// b,c
	// a,c
//	u = j+i;
//	y = i+j;
//	v = j+k;
//	x = i+k;

	std::copy(j, j + 16, u);
	std::copy(i, i + 16, u + 16);
	std::copy(i, i + 16, y);
	std::copy(j, j + 16, y + 16);
	std::copy(j, j + 16, v);
	std::copy(k, k + 16, v + 16);
	std::copy(i, i + 16, x);
	std::copy(k, k + 16, x + 16);
	showCh(u);
	showCh(y);
	showCh(v);
	showCh(x);
	return 0;
}
int main(int argc, const char* argv[]){
	const char a[] = {
		'.',
		argv[1][0],
		argv[1][1],
		argv[1][2],
		argv[1][3],
		argv[1][4],
       		argv[1][5],
		argv[1][6],
		argv[1][7],
       		argv[1][8],
		argv[1][9],
		argv[1][10],
       		argv[1][11],
		argv[1][12],
		argv[1][13],
       		argv[1][14]
	};
	const char b[] = {
		argv[1][15],
		argv[1][16],
		argv[1][17],
		argv[1][18],
		argv[1][19],
		argv[1][20],
       		argv[1][21],
		argv[1][22],
		argv[1][23],
       		argv[1][24],
		argv[1][25],
		argv[1][26],
       		argv[1][27],
		argv[1][28],
		argv[1][29],
       		argv[1][30]
	};
	const char c[] = {

		argv[1][31],
		argv[1][32],
		argv[1][33],
		argv[1][34],
		argv[1][35],
		argv[1][36],
       		argv[1][37],
		argv[1][38],
		argv[1][39],
       		argv[1][40],
		argv[1][41],
		argv[1][42],
       		argv[1][43],
		argv[1][44],
		argv[1][45],
		'.'
	};
//        cout <<  "0" + argv[1][0] + "0";
	br();
	cout << a << " " << sizeof(a) << endl;
	cout << b << " " << sizeof(b) << endl;
	cout << c << " " << sizeof(c) << endl;

	br();
	showCh(a);
	showCh(b);
	showCh(c);
	br();
	packetCr(a,b,c);
	return 0;

}
