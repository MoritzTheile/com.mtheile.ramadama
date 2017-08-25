package com.mtheile.ramadama;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JustAMain {

	public static void maintest(String[] args) throws SQLException {
		String url = "jdbc:postgresql://ec2-54-75-239-190.eu-west-1.compute.amazonaws.com/dfktb251mp9pct?user=vhgqlssxdvnywk&password=7a50ffaa718002b883a1de591a92b8878168a3c2628cf4493c82df22a12e819a&ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory";
		Connection conn = DriverManager.getConnection(url);
		System.out.println(conn.getMetaData().getMaxColumnNameLength());

	}

}
