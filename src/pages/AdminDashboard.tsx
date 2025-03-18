import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Coursestabs from "@/components/Admincomponents/Coursestabs";
import UsersStudentstab from "@/components/Admincomponents/UsersStudentstab";


const AdminDashboard = () => {
 

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-12 mt-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Manage classes, upload materials, and organize batches
            </p>
          </div>
          <Coursestabs/>
         <UsersStudentstab/>
          </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
